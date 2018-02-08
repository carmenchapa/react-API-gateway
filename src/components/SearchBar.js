import React from 'react'

const barStyle = {
  paddingLeft: '60px'
}

const SearchBar = ({getValue}) => {
  return (
            <div style={barStyle}>
                <form onSubmit= {getValue} >
                  <input type="text" name="input" />
                </form>
            </div>
        )
}

export default SearchBar
