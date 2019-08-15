export const makeInputBouquet = (userId, newBouquet) => {
  return dispatch => {
    dispatch({type: "CLEAR_ERROR"})
    return fetch("http://localhost:3000/bouquets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          name: newBouquet.title,
          sentence: newBouquet.sentence
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.id) {
          dispatch({type: "ADD_TO_BOUQUET", payload: data})
          dispatch({type: "CLEAR_LIST"})
        } else {
          dispatch({type: "ERROR", payload: data.errors})
        }
      })
  }
}

export const makeAdjBouquet = (adjs, userId, title) => {
  return dispatch => {
    dispatch({type: "LOADING_SCREEN"})
    return fetch("http://localhost:3000/bouquet_adj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        name: title,
        adjectives: adjs
      })
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.id) {
        dispatch({type: "ADD_TO_BOUQUET", payload: data})
        dispatch({type: "CLEAR_LIST"})
      }
    })
  }
}

export const makeRandomBouquet = userId => {
  return dispatch => {
    return fetch("http://localhost:3000/rand_bouquets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        name: "🌱🌸 Random 🌸🌱"
      })
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.id) {
        dispatch({type: "ADD_TO_BOUQUET", payload: data})
      }
    })
  }
}

export const deleteBouquet = (bouquetId) => {
  debugger
  return dispatch => {
    return fetch(`http://localhost:3000/bouquets/${bouquetId}`, {
      method: "DELETE"
    })
    .then(dispatch({type: "UPDATE_BOUQUET", payload: bouquetId}))
  }
}

export const fetchAllBouquets = () => {
  return dispatch => {
    return fetch("http://localhost:3000/bouquets")
    .then(resp => resp.json())
    .then(data => {
      if(data.length > 0) {
        dispatch({type: "SET_ALL_BOUQUETS", payload: data})
      }
    })
  }
}

export const updateFeed = bouquetId => {
  return dispatch => {
    dispatch({type: "UPDATE_FEED", payload: bouquetId})
  }
}

export const turnOffLoading = () => {
  return dispatch => {
    dispatch({type: "TURN_OFF_LOADING"})
  }
}
