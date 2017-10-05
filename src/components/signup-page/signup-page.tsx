import { Component, Prop, State } from '@stencil/core';

import { RouterHistory } from '@stencil/router';

import { setState } from '../../store';

import { signup } from '../../user';

@Component({
  tag: 'signup-page',
  styleUrl: 'signup-page.scss'
})
export class SignupPage {
  @Prop() history: RouterHistory;

  @State() username: string;
  @State() password: string;

  async handleSubmit(event) {
    event.preventDefault();

    console.log('Signing up', this.username, this.password);

    try {
      const signupResponse = await signup(this.username, this.password);

      setState({
        user: signupResponse
      });

      this.history.push('/chat');
    } catch(e) {
      alert("Unable to sign up, try again.");
      return;
    }
  }

  setField(field, event) {
    this[field] = event.target.value;
  }

  render() {
    return (
      <ion-page class="show-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Sign up</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
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
            <ion-button>Sign up</ion-button>
          </form>
        </ion-content>
      </ion-page>
    )
  }
}