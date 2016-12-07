import React from 'react';
import Box from 'grommet/components/Box';

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
};

/**
* This is a small helper component to create a flexible container for the cells.
* It makes sure the row will display on screen without wrapping.
*/
const Row = ({children}) =>
  <Box pad="none" justify="center" direction="row"
       wrap={false} flex={true} responsive={false}>{children}</Box>

export default Row;
