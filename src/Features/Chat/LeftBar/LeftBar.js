import React from 'react';
import { Grid, Image, List, Label } from 'semantic-ui-react';
import FilterComponent from '../Filter/Filter';
import './leftBar.css'

const LeftBar = (props) => {
    
    const { data, selectedIndex, setSelectedIndex, setsearchedText}=props;

    const getHumanRedabeDate = (timeStamp) => {
        if(!timeStamp)
            return '';
        return(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timeStamp))
    };

    return (
        <>
            <Grid.Column width={ selectedIndex? 7 : 16 }>
                <FilterComponent setsearchedText={setsearchedText}/>
                <List celled>
                    {
                        data?.map((item) => (
                            <List.Item className={selectedIndex === item?.id ?  'list-item list-item-selected' : 'list-item'} onClick={(e)=>setSelectedIndex(item.id)}>
                                <Image avatar src={item?.imageURL} />
                                <List.Content>
                                    <List.Header>{item?.title}</List.Header>
                                    {item?.orderId}
                                    <aside className="message-preview">
                                        {item.messagePreview} 
                                    </aside>
                                </List.Content>
                                    <span className="date">{getHumanRedabeDate(item?.latestMessageTimestamp)}</span>
                            </List.Item>
                        ))
                    }
                </List>
            </Grid.Column>
        </>
    )
}

export default LeftBar