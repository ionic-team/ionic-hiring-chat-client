import { Component } from '@stencil/core';

import { getState } from '../../store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss'
})
export class AppRoot {
  user: any;

  componentWillLoad() {
    const existingState = getState();
    this.user = existingState['user'];
  }

  render() {
    return (
      <stencil-router>
        <stencil-route url="/" exact={true} routeRender={() => {
          if(this.user) {
            return (
              <stencil-router-redirect url="/chat"></stencil-router-redirect>
            );
          }
          return (
            <stencil-router-redirect url="/login"></stencil-router-redirect>
          );
        }} />
        <stencil-route url="/login" component="login-page" exact={true} />
        <stencil-route url="/signup" component="signup-page" exact={true} />
        <stencil-route url="/chat" component="ionic-chat" exact={true} />
      </stencil-router>
    )
  }
}