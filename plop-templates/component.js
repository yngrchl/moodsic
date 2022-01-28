import React from 'react';
import PropTypes from 'prop-types';
import './{{properCase name}}.module.scss';

/**
 * Description goes here
 */
const {{properCase name}} = ({ propName }) => <div>{propName}</div>;

{{properCase name}}.defaultProps = {
  propName: 'Defaulted',
};

{{properCase name}}.propTypes = {
  propName: PropTypes.string,
};

export default {{properCase name}};
