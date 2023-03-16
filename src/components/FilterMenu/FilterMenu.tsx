import React, {useEffect, useState } from "react";
import { useStyles } from './style';

type Props = {
  userId: number;
};

const FilterMenu: React.FC<Props> = () => {

    const classes = useStyles();

    useEffect(() => {
        console.log("effect hihi");
    });

      return (
        <div className={classes.container}>
          <h1>hah</h1>
        </div>
      );
  };

  export default FilterMenu;