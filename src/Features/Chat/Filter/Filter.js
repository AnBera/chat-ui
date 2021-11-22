import React from "react";
import { Grid, Input, Label, Segment } from 'semantic-ui-react'



const FilterComponent = (props) => {
  const {setsearchedText}=props;

    return (
        <Grid.Column width={7}>
                Filter by Title/Oder ID
            <div>
                <Input
                    icon='search'
                    iconPosition='left'
                    placeholder='Search...'
                    onChange={(e)=>setsearchedText(e.target.value)}
                />
            </div>
        </Grid.Column>
    );
}

export default FilterComponent;