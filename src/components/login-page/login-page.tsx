import { Component, Prop, State } from '@stencil/core';

import { RouterHistory } from '@stencil/router';

import { persist } from '../../store';

import { login } from '../../user';

@Component({
  tag: 'login-page',
  styleUrl: 'login-page.scss'
})
export class LoginPage {
  @Prop() history: RouterHistory;

  @State() username: string;
  @State() password: string;

  async handleSubmit(event) {
    event.preventDefault();

    console.log('Logging in', this.username, this.password);

    try {
      const loginResponse = await login(this.username, this.password);

      persist({
        user: loginResponse
      })

      this.history.push('/chat');
    } catch(e) {
      alert("Unable to log in, try again.");
      return;
    }
  }

  setField(field, event) {
    this[field] = event.target.value;
    console.log('Setting state', field, event.target.value);
  }

  render() {
    return (
      <ion-page class="show-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Login</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <ion-list>
              <ion-item>
                <ion-label fixed>Username</ion-label>
                <ion-input onInput={this.setField.bind(this, 'username')} value={this.username} />
              </ion-item>
              <ion-item>
                <ion-label fixed>Password</ion-label>
                <ion-input type="password" onInput={this.setField.bind(this, 'password')} value={this.password} />
              </ion-item>
            </ion-list>
            <ion-button block>Log in</ion-button>
          </form>
        </ion-content>
      </ion-page>
    )
  }
}