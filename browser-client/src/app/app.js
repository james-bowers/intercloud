import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { Header } from './components/stateless'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Account from './pages/Account'

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
    handleRoute = (e) => {
        this.currentUrl = e.url;
    };

    render() {
        return (
            <div>
                <Header />
                <main>
                    <Router onChange={this.handleRoute}>
                        <Home path="/" />
                        <SignUp path="/sign-up" />
                        <Account path="/account" />
                        <Projects path="/projects" />
                    </Router>
                </main>
            </div>
        );
    }
}
