import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { chatInsert, chatList } from '../actions/chatAction';
import SocketIOClient from 'socket.io-client';
import {SERVERURL } from '../../config';

type Props = {
    name?: string,
};

 class Chat extends React.Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        userid: this.props.navigation.state.params.userid,
        messages: [],
    };


  /*  constructor(props) {
        super(props);
            this.state = {
                userid: this.props.navigation.state.params.userid,
                messages: []
        }
        this.onSend = this.onSend.bind(this);
    } */
        componentDidMount() {
            // To Deploy server-less app host your project on heroku and use the link below
           // this.socket = SocketIOClient('herokuapp.com');
            this.socket = SocketIOClient('http://192.168.43.28:3000');
          const data = {
              receiver_id: this.props.navigation.state.params.userid,
              sender_id: this.props.userReducer.userAuth._id
          };

          this.socket.emit('getMessage', data);
          this.socket.on('receiveMessage', (chatlist) => {
              if(chatlist) {
                  this.setState({messages: chatlist});
              }
          });
        }

        // let that = this;
         /*  setInterval(async () => {
              this.props.onGetMessage(data)
          },10000); */
        

        componentDidUpdate(nextProps) {
            if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true) {
              this.setState({
                  messages: this.props.chatReducer.chatList
                });
             }
           }


        onSend(messages = []) {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }))
        }


        submitChatMessage(messages = []) {
            const date = new Date();
            this.onSend(messages)
            let details = {
                user: {
                    _id: this.props.userReducer.userAuth._id
                },
                receiver_id: this.state.userid,
                sender_id: this.props.userReducer.userAuth._id,
                chatdate: date,
                text: messages && messages[0] && messages[0].text 
            }
            //this.props.onChatMessage(details);
            this.socket.emit('chatMessage', details);
        }
    
        renderBubble = (props) => {
            return (<Bubble {...props}
            textStyle={{
                right: {
                    color: '#000000',
                   
                },
                left: {
                    color: '#000000',
                
                },
            }}
            timeTextStyle={{
                right: {
                    color: '#000000',
                },
                left: {
                    color: '#000000',
                },
    
            }}
            wrapperStyle={{
                left: {
                    backgroundColor: '#59d4e8',
                },
                right: {
                    backgroundColor: '#94fc13',
                }
            }} />
            );
        }
    

        render() {
            return(
                <View style={styles.container}>
                <View style={{ flex: 1, marginTop: 90 }}>
                    <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.submitChatMessage(messages)}
                    renderBubble={this.renderBubble}
                    user={{
                        _id: this.props.userReducer.userAuth._id,
                    }}
                    />
                </View>
                </View>
            )
        }
    }
 

   

    function mapStateToProps(state) {
        return {
          chatReducer: state.chatReducer,
          userReducer: state.userReducer
        };
      }
      
      function mapDispatchToProps(dispatch) {
        return {
          onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
          onGetMessage: (data) => dispatch(chatList(data))
        };
      }
        
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps,
      )(Chat);


      const styles = StyleSheet.create({

        container: {
          flex: 1,
          backgroundColor: '#b4f2e1'
         
        }
        
    
    });