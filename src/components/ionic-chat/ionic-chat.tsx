import { Component, Prop, State } from '@stencil/core';

import { RouterHistory } from '@stencil/router';

import { connect, send, onData } from '../../connection';
import { getRooms, createRoom } from '../../rooms';
import { Room } from '../../room';
import { getState } from '../../store';
import { logout } from '../../user';
import { leftPad } from '../../util';

@Component({
  tag: 'ionic-chat',
  styleUrl: 'ionic-chat.scss'
})
export class IonicChat {
  @Prop() history: RouterHistory;

  @State() rooms: Room[] = [];

  @State() selectedRoom: Room = null;

  @State() chatValue: string = '';
  @State() chatQueue: any[] = [];

  @State() user: any;

  initConnection() {
    connect();
    onData((resp) => {
      const data = resp.data;
      console.log('Got socket data', data);
      try {
        const d = JSON.parse(data);
        if(d.username !== this.user.username) {
          if(this.selectedRoom) {
            this.selectedRoom.addChat(d);
            this.chatQueue = [...this.chatQueue, d];
          }
        }
      } catch(e) {
        console.error('Unable to parse socket data', e);
      }
    })
  }

  async componentDidLoad() {
    this.user = getState()['user'];
    console.log('Loaded user', this.user);
    if(!this.user) {
      this.history.push('/login');
      return;
    }

    this.initConnection();

    const rooms = await getRooms(this.user);
    this.rooms = rooms.map(room => new Room(room));
    console.log('Loaded rooms', rooms);
    this.rooms.length && this.selectRoom(this.rooms[0]);
  }

  openMenu() {
    const menu = document.querySelector('ion-menu-controller') as any;
    menu.open && menu.open('left');
  }

  closeMenu() {
    const menu = document.querySelector('ion-menu-controller') as any;
    menu.close && menu.close('left');
  }

  async createRoom() {
    const roomName = window.prompt('New room name');
    const newRoom = await createRoom(roomName, this.user);
    console.log('Created new room', newRoom);
    this.rooms = [...this.rooms, newRoom];
    this.selectRoom(newRoom);
  }

  async selectRoom(room) {
    console.log('Opening room', room);
    this.selectedRoom = room;
    await this.selectedRoom.loadChats(this.user);
    this.chatQueue = [];
    this.closeMenu();
  }

  formatTime(dateString: string) {
    const date = new Date(Date.parse(dateString));
    return leftPad(date.getHours(), 2, '0') + ':' + leftPad(date.getMinutes(), 2, '0');
  }

  async handleChatSubmitted(event) {
    console.log('Submitted', this.chatValue);
    event.preventDefault();
    if(!this.selectedRoom) { return; }
    this.chatQueue = [...this.chatQueue, this.chatValue];
    const resp = await this.selectedRoom.chat(this.chatValue, this.user);
    send(JSON.stringify(resp))
  }

  handleChatInputChanged(event) {
    this.chatValue = event.target.value;
  }

  handleLogout() {
    logout(this.user);
    this.history.push('/login');
  }

  render() {
    const rooms = this.rooms;
    const room = this.selectedRoom || new Room({ name: '', chats: [] });
    const chats = room.chats;

    const title = (room && '#' + room.name) || 'Ionic Chat';

    return [
      <ion-menu-controller></ion-menu-controller>,
      <ion-modal-controller></ion-modal-controller>,
      <ion-page main="main" class="show-page">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button onClick={this.openMenu.bind(this)}>
                <ion-icon name="menu" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-title>{title}</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={this.createRoom.bind(this)}>
                <ion-icon name="add" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content padding class="content">
          <div>
          {chats.map(chat => {
            const chatTime = this.formatTime(chat.at);
            return (
              <div class="chat">
                <div class="chat-time">{chatTime}</div>
                <div class="chat-text"><span class="chat-username">{chat.username}</span> {chat.text}</div>
              </div>
            )
          })}
          </div>
        </ion-content>

        <ion-footer>
          <form onSubmit={this.handleChatSubmitted.bind(this)}>
            <ion-input autofocus onInput={this.handleChatInputChanged.bind(this)} value={this.chatValue}></ion-input>
          </form>
        </ion-footer>
      </ion-page>,

      <ion-menu side="left">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Rooms</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            {rooms.map(room => {
              return (
                <ion-item onClick={this.selectRoom.bind(this, room)}>
                  <div class="room-color" style={{backgroundColor: room.color}}></div> #{room.name}
                </ion-item>
              );
            })}
          </ion-list>
          <ion-list>
            <ion-item onClick={this.handleLogout.bind(this)} id="logout">Log out</ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>,

    ];
  }
}
