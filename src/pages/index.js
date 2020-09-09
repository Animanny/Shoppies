import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { debounce } from "lodash"
import html2canvas from "html2canvas"

import MovieResult from "../components/MovieResult"
import Nomination from "../components/Nomination"

import ShoppiesLogo from "../images/shoppiesLogo.png"

const HeaderDiv = styled.div`
  padding-left: 100px;
  background-color: #7024ff;
  display: flex;
  height: 275px;

  @media only screen and (max-width: 768px) {
    padding-left: 10%;
  }
`
const HeaderImg = styled.img`
  margin-top: calc((275px - 225px) / 2);
  max-height: 225px;
  @media only screen and (max-width: 768px) {
    margin-top: calc((275px - 100px) / 2);
    max-height: 100px;
  }
`

const HeaderContent = styled.div`
  margin-left: 75px;
  margin-top: auto;
  margin-bottom: auto;
  @media only screen and (max-width: 768px) {
    margin-left: 25px;
  }
`

const SearchLabel = styled.label`
  color: white;
  font-family: "Lato", sans-serif;
  display: block;
  font-size: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
`

const SearchField = styled.input`
  border: white solid 2px;
  border-radius: 20px;
  height: 50px;
  width: 500px;
  font-size: 25px;
  padding-left: 10px;
  background-color: #7024ff;
  color: white;
  font-family: "Lato", sans-serif;

  :focus {
    outline: none;
  }
  ::placeholder {
    color: #ffffff85;
  }

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`

const MainContentContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`

const SearchResultsBox = styled.div`
  margin-left: 5%;
  padding-top: 25px;
  width: 50%;
  display: block;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
  }
`

const SearchResultsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  @media only screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const SearchResults = styled.div`
  height: 500px;
  padding-top: 25px;
  padding-left: 25px;
  display: flex;
  overflow-x: auto;
  white-space: normal;
  background-color: #eeeeee;
  @media only screen and (max-width: 768px) {
    margin-top: 25px;
    align-items: flex-start;
    flex-direction: row;
  }
`

const NomsBox = styled.div`
  margin-top: 25px;
  margin-left: 10%;
  width: 30%;
  display: block;
  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
  }
`

const NomHeader = styled.div`
  display: flex;
`

const NomResults = styled.div`
  height: 500px;
  display: block;
  overflow-y: auto;
  white-space: normal;
  background-color: #eeeeee;
`

const ClearAllButton = styled.button`
  background-color: #7024ff;
  border-radius: 5px;
  color: white;
  border: none;
  min-width: 65px;
  width: 90%;
  font-weight: bold;
  margin-left: 5%;
  margin-top: 21.44px;
  height: 37px;
`

const FiveNomsDoneMessage = styled.h3`
  color: #2d2d2d;
  font-family: "Lato", sans-serif;
  width: fit-content;
  margin-right: 25px;
  font-size: 17px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    #2bae6661 50%
  );

  @media only screen and (max-width: 768px) {
    margin-top: 0px;
  }
`

const ShareButton = styled.button`
  height: 37px;
  min-width: 65px;
  color: white;
  background-color: #2bae66;
  border: none;
  border-radius: 5px;
  font-weight: bold;
`

const NoMovies = styled.h1`
  color: #4a4a4a;
  font-family: "Lato", sans-serif;
`
const ShoppiesHeader = styled.h1`
  color: white;
  font-family: "Lato", sans-serif;
`

const SectionTitle = styled.h1`
  color: #4a4a4a;
  font-family: "Lato", sans-serif;
  margin-right: 25px;
  margin-bottom: 18.72px;
`

const Home = () => {
  const [searchResults, setSearchResults] = useState([])
  const [nominations, setNominations] = useState(() => {
    let localNoms =
      typeof window !== "undefined" ? window.localStorage.getItem("noms") : null
    return localNoms !== null ? JSON.parse(localNoms) : []
  })

  const searchHandler = () => {
    let searchTerm = document.querySelector("#movieSearchField").value
    if (searchTerm !== "") {
      apiCall(searchTerm).then(searchResults => {
        if (searchResults != null) {
          setSearchResults(searchResults.Search)
        }
      })
    } else {
      setSearchResults([])
    }
  }

  const apiCall = searchTerm => {
    const baseApiURL = new URL("https://www.omdbapi.com/")
    baseApiURL.search = new URLSearchParams({
      i: "tt3896198",
      apikey: "653a14be",
      type: "movie",
      s: searchTerm.trim(),
    })

    const searchResult = fetch(baseApiURL)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(json => {
        return json
      })
    return searchResult
  }

  useEffect(() => {
    window.localStorage.setItem("noms", JSON.stringify(nominations))
  })

  const _handleKeyDown = debounce(() => {
    searchHandler()
  }, 250)

  let renderedSearchResults = searchResults => {
    if (searchResults != null) {
      return (
        <>
          {searchResults.map(movie => (
            <MovieResult
              movieData={movie}
              getNoms={nominations}
              updateNoms={setNominations}
            ></MovieResult>
          ))}
        </>
      )
    } else {
      return (
        <NoMovies>
          Couldn't find that movie{" "}
          <span role="img" aria-label="sad face emoji">
            😞
          </span>
        </NoMovies>
      )
    }
  }

  let renderNominations = nominations => {
    if (nominations != null) {
      return (
        <>
          {nominations.map(movie => (
            <Nomination
              movieData={movie}
              getNoms={nominations}
              updateNoms={setNominations}
            ></Nomination>
          ))}
        </>
      )
    }
  }

  const clearNoms = () => {
    setNominations([])
  }

  let shareNoms = nominations => {
    let baseLink = "https://twitter.com/intent/tweet?text="
    let noms = ""

    noms +=
      "I just nominated my films for The Shoppies '21! Checkout my list:%0A%0A"

    nominations.map(nom => {
      noms += "- " + nom.Title + " (" + nom.Year + ")%0A"
    })

    noms += "%0ANominate your favs @&url=nominateshoppies.netlify.app"
    return baseLink + noms
  }

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Nominate Shoppies</title>
        <link rel="canonical" href="https://nominateshoppies.netlify.app/" />
      </Helmet>
      <HeaderDiv>
        <HeaderImg src={ShoppiesLogo} alt={"Gold Shopify Logo"}></HeaderImg>
        <HeaderContent>
          <ShoppiesHeader>The Shoppies</ShoppiesHeader>
          <SearchLabel for={"movieSearchField"}>Movie Title</SearchLabel>
          <SearchField
            placeholder="The Dark Knight"
            type="text"
            id="movieSearchField"
            onKeyDown={_handleKeyDown}
          ></SearchField>
        </HeaderContent>
      </HeaderDiv>
      <MainContentContainer>
        <SearchResultsBox>
          <SearchResultsHeader>
            <SectionTitle>Search Results</SectionTitle>
            {nominations.length === 5 && (
              <>
                <FiveNomsDoneMessage>
                  You've nominated 5 movies!{" "}
                  <span role="img" aria-label="party confetti emoji">
                    🎉
                  </span>
                </FiveNomsDoneMessage>
                <a href={shareNoms(nominations)} target={"_blank"}>
                  <ShareButton type={"submit"}>Share</ShareButton>
                </a>
              </>
            )}
          </SearchResultsHeader>
          <SearchResults id="searchResults">
            {renderedSearchResults(searchResults)}
          </SearchResults>
        </SearchResultsBox>
        <NomsBox>
          <NomHeader>
            <SectionTitle>Nominations</SectionTitle>
            {nominations.length >= 2 && (
              <ClearAllButton onClick={clearNoms}>Clear</ClearAllButton>
            )}
          </NomHeader>
          <NomResults id="nomResults">
            {renderNominations(nominations)}
          </NomResults>
        </NomsBox>
      </MainContentContainer>
    </div>
  )
}

export default Home
