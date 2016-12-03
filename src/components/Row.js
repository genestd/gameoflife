import React from 'react';
import Box from 'grommet/components/Box';

const style = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap'
};

const Row = ({children}) =>
  <Box pad="none" justify="center" direction="row"
       wrap={false} flex={true} responsive={false}>{children}</Box>

export default Row;
