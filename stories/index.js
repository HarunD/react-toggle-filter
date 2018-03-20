import React from 'react'
import {storiesOf} from '@storybook/react'
import {Button} from '@storybook/react/demo'

import ToggleFilter from './../src/ToggleFilter';

storiesOf('ToggleFilter', module).add('with default style', () => (
  <div>
    <h1>ToggleFilter</h1>
    <ToggleFilter
      items={['test', 'test2', 'test3']}
      onItemToggle={(selectedItems, allItems) => {
      console.log('ITEMS:', selectedItems);
    }}/>
  </div>
));