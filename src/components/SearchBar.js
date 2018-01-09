import React from 'react'

const SearchBar = ({getValue}) => {
  return (
            <div>
                <form onSubmit= {getValue} >
                  <input type="text" name="input" />
                </form>
            </div>
        )
}

export default SearchBar
