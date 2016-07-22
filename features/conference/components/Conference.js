import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from '../../../config';
import {
    destroy,
    init
} from '../../base/connection';
import { FilmStrip } from '../../filmStrip';
import { LargeVideo } from '../../largeVideo';
import { Toolbar } from '../../toolbar';

import { ConferenceContainer } from './ConferenceContainer';

/**
 * The conference page of the application.
 */
class Conference extends Component {
    /**
     * Inits new connection and conference when conference screen is entered.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillMount() {
        // XXX If we enter conference directly through URL, we might not have
        // roomName in state yet. So getting it directly from location here.
        // In future app might also be able to launch conference directly
        // without entering the welcome page so this place might become an
        // extension point.
        let room = this.props.roomName ||
            window.location.pathname.substr(1).toLowerCase();

        this.props.dispatch(init(config, room));
    }

    /**
     * Destroys connection, conference and local tracks when conference screen
     * is left.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        this.props.dispatch(destroy());
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <ConferenceContainer>
                <LargeVideo/>
                <Toolbar navigator = { this.props.navigator }/>
                <FilmStrip/>
            </ConferenceContainer>
        );
    }
}

/**
 * Conference component's property types.
 *
 * Ensure that the application navigator object is passed down via props on
 * mobile.
 *
 * @static
 */
Conference.propTypes = {
    dispatch: React.PropTypes.func,
    navigator: React.PropTypes.object,
    participants: React.PropTypes.object,
    roomName: React.PropTypes.string
};

/**
 * Maps roomName property from state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {{ roomName: string }}
 */
export const mapStateToProps = state => {
    const stateFeaturesWelcome = state['features/welcome'];

    return {
        roomName: stateFeaturesWelcome.roomName
    };
};

export default connect(mapStateToProps)(Conference);