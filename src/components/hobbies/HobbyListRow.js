
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const HobbyListRow = ({hobby}) => {
  return (
    <tr>
      <td>{hobby.name}</td>
    </tr>
  );
};

HobbyListRow.propTypes = {
  hobby: PropTypes.object.isRequired
};

export default HobbyListRow;