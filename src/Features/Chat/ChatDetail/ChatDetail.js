import React, { useState } from 'react'
import { Grid, Header, Image, Label, Input, List } from 'semantic-ui-react'
import './chatDetail.css'

const ChatDetail = ({ data, addMessage }) => {
    const [inputMessage, setInputMessage] = useState('');
    const { title, imageURL, messageList, id } = data;

    const handleChatChange = (e) => {
        setInputMessage(e?.target?.value);
    };
    const handleChatEnter = (e) => {
        if (e?.target?.value && e.key === 'Enter') {
            addMessage && addMessage(id, e?.target?.value);
            setInputMessage('');
        }
    };

    return (
        <Grid.Column width={9} className="chat-detail-container">
            <Header as='h2' className="chat-detail-header">
                <Image className="keep-aspect" src={imageURL} />
                {title}
            </Header>
            <div className="chat-details">
                {
                    messageList?.map((item) => (
                        <>
                            {(item?.sender === 'BOT') && (
                                <Label.Group>
                                    <Label className="left">{item?.message}
                                        {(item?.messageType === 'optionedMessage') && (

                                            <List divided verticalAlign='middle' className="message-list">
                                                {
                                                    item?.options?.map((item) => (
                                                        <List.Item>
                                                            <List.Content>
                                                                <a >
                                                                    {item?.optionText}
                                                                </a>
                                                            </List.Content>
                                                            <List.Content>{item?.optionSubText}</List.Content>
                                                        </List.Item>

                                                    ))
                                                }
                                            </List>

                                        )}
                                    </Label>

                                </Label.Group>
                            )}

                            {(item?.sender === 'USER') && (
                                <Label.Group className="right">
                                    <Label >{item.message}</Label>
                                </Label.Group>
                            )}
                        </>
                    ))
                }

            </div>
            <div>
                <Input fluid icon='send' className="chat-detail-message-box" placeholder='Type a message...'
                    value={inputMessage}
                    onChange={handleChatChange}
                    onKeyDown={handleChatEnter} />
            </div>

        </Grid.Column>
    )
}

export default ChatDetail