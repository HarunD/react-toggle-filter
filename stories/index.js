import React from 'react';
import {storiesOf} from '@storybook/react';

import ToggleFilter from './../src/ToggleFilter';

storiesOf('ToggleFilter', module).add('default', () => (
  <div>
    <h1>ToggleFilter</h1>
    <ToggleFilter
      items={['Open', 'Resolved', 'Closed']}
      onItemToggle={(selectedItems, allItems) => {
      console.log('Selected items:', selectedItems);
    }}/>
  </div>
)).add('with preselected items', () => (
  <div>
    <h1>ToggleFilter with preselected items</h1>
    <ToggleFilter
      items={['Open', 'Resolved', 'Closed']}
      selected={['Open', 'Resolved']}
      onItemToggle={(selectedItems, allItems) => {
      console.log('Selected items:', selectedItems);
    }}/>
  </div>
)).add('with custom style', () => (
  <div>
    <h1>ToggleFilter with custom style</h1>
    <ToggleFilter
      items={['Open', 'Resolved', 'Closed']}
      className="CustomToggleFilter"
      itemClassName="CustomToggleFilter__Item"
      style={{
      backgroundColor: '#eee',
      padding: '10px',
      textTransform: 'uppercase'
    }}
      onItemToggle={(selectedItems, allItems) => {
      console.log('Selected items:', selectedItems);
    }}/>
  </div>
));