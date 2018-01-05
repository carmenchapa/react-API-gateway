import React from 'react'
// import PropTypes from 'prop-types'

class Picker extends React.Component {

    render() {
        return (
            <div>
                <form onSubmit= {this.props.getValue} >
                  <input type="text" name="input" />
                </form>
            </div>
        )
    }
}

export default Picker
