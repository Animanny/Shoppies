import React from "react"
import styled from "styled-components"

const MovieResult = props => {
  const title = props.movieData.Title
  const poster =
    props.movieData.Poster === "N/A"
      ? "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png"
      : props.movieData.Poster
  const year = props.movieData.Year

  const MovieResultDiv = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 150px;
    background-image: -webkit-linear-gradient(rgba(255,255,255,0), #000), url(${poster});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  `

  const MovieInfoDiv = styled.div`
    margin-left: 5%;
    margin-bottom: 5%;
    width: 80%;
  `

  const MovieTitle = styled.h3`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-family: "Lato", sans-serif;
    margin-bottom: 5px;
    color: white;
  `

  const MovieYear = styled.h4`
    margin-top: 5px;
    color: white;
    font-family: "Lato", sans-serif;
  `

  const RemoveButton = styled.button`
    background-color: #3e3e3e;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    border: none;
    width: 100px;
    height: 40px;
  `

  let nominateMovie = () => {
    let movieStrings = []

    props.getNoms.map(movie => {
      movieStrings.push(JSON.stringify(movie))
    })

    let currentNoms = [...props.getNoms]
    let index = movieStrings.indexOf(JSON.stringify(props.movieData))
    currentNoms.splice(index, 1)
    props.updateNoms([...currentNoms])
  }

  return (
    <>
      <MovieResultDiv>
        <MovieInfoDiv>
          <MovieTitle>{title}</MovieTitle>
          <MovieYear>{year}</MovieYear>
          <RemoveButton onClick={nominateMovie}>Remove</RemoveButton>
        </MovieInfoDiv>
      </MovieResultDiv>
    </>
  )
}

export default MovieResult
