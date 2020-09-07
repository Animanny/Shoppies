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
    flex-direction: column;
    height:450px;
    width: 200px;
    margin-right: 100px;

    @media only screen and (max-width: 768px) {
      margin-right:50px;
    }
  `

  const MovieTitle = styled.h3`
    width: 220px;
    overflow-wrap: break-word;
    font-family: "Lato", sans-serif;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #4a4a4a;
  `

  const MovieYear = styled.h4`
    margin-top: 5px;
    color: #4a4a4a;
    font-family: "Lato", sans-serif;
  `

  const NominateButton = styled.button`
    background-color: #b48cff;
    border-radius: 5px;
    margin-bottom:0px;
    color: white;
    font-weight: bold;
    border: none;
    width: 100px;
    height: 40px;
  `

  const RemoveButton = styled(NominateButton)`
    background-color: #3e3e3e;
    color: white;
  `

  const DisableButton = styled(NominateButton)`
    background-color: #7f7f7f;
    color: #cdcdcd;
  `

  const MovieResultImg = styled.div`
    /*border: white 10px solid;*/
    width: 202.7px;
    height: 300px;
    background-image: url(${poster});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  `

  let nominateMovie = () => {
    let movieStrings = []

    props.getNoms.map(movie => {
      movieStrings.push(JSON.stringify(movie))
    })

    if (movieStrings.indexOf(JSON.stringify(props.movieData)) === -1) {
      props.updateNoms([...props.getNoms, props.movieData])
    } else {
      let currentNoms = [...props.getNoms]
      let index = movieStrings.indexOf(JSON.stringify(props.movieData))
      currentNoms.splice(index, 1)
      props.updateNoms([...currentNoms])
    }
  }

  const renderButton = () => {
    let movieStrings = []

    props.getNoms.map(movie => {
      movieStrings.push(JSON.stringify(movie))
    })

    if (movieStrings.indexOf(JSON.stringify(props.movieData)) !== -1) {
      return <RemoveButton onClick={nominateMovie}>Remove</RemoveButton>
    } else if (props.getNoms.length === 5) {
      return <DisableButton disabled>Nominate</DisableButton>
    } else {
      return <NominateButton onClick={nominateMovie}>Nominate</NominateButton>
    }
  }

  return (
    <>
      <MovieResultDiv>
        <MovieResultImg></MovieResultImg>
        <MovieTitle>{title}</MovieTitle>
        <MovieYear>{year}</MovieYear>
        {renderButton()}
      </MovieResultDiv>
    </>
  )
}

export default MovieResult
