"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../Constants");
var Selectors_1 = require("../Selectors");
// ====================================================================
/**
 * Add a new peer for a room.
 *
 * @private
 *
 * @param roomAddress string
 * @param peerAddress string
 */
function peerOnline(roomAddress, peerAddress, opts) {
    return function (dispatch, getState) {
        dispatch({
            payload: {
                customerData: opts.customerData,
                displayName: opts.displayName,
                id: opts.id,
                joinedCall: opts.joinedCall || false,
                peerAddress: peerAddress,
                requestingMedia: opts.requestingMedia || 'none',
                role: opts.role,
                roomAddress: roomAddress
            },
            type: Constants_1.PEER_ONLINE
        });
        var client = Selectors_1.getClient(getState());
        if (client) {
            client.mesh.updateConnections();
        }
    };
}
exports.peerOnline = peerOnline;
/**
 * Mark a peer as offline.
 *
 * @private
 *
 * @param roomAddress string
 * @param peerAddress string
 */
function peerOffline(roomAddress, peerAddress) {
    return function (dispatch, getState) {
        dispatch({
            payload: {
                peerAddress: peerAddress,
                roomAddress: roomAddress
            },
            type: Constants_1.PEER_OFFLINE
        });
    };
}
exports.peerOffline = peerOffline;
/**
 * Update a peer's information.
 *
 * @private
 *
 * @param peerAddress string
 * @param updated.chatState 'active' | 'composing' | 'paused'
 * @param updated.displayName string
 * @param updated.speaking boolean
 * @param updated.requestingAttention boolean
 * @param updated.rtt string
 * @param updated.customerData object
 * @param updated.volumeLimit number
 * @param updated.joinedCall boolean
 * @param updated.requestingMedia 'video' | 'audio' | 'none'
 */
function peerUpdated(peerAddress, updated) {
    return function (dispatch, getState) {
        dispatch({
            payload: {
                peerAddress: peerAddress,
                updated: updated
            },
            type: Constants_1.PEER_UPDATED
        });
        var client = Selectors_1.getClient(getState());
        if (client) {
            client.mesh.updateConnections();
        }
    };
}
exports.peerUpdated = peerUpdated;
/**
 * @description
 * Kick a peer from the room.
 *
 * Only takes effect if the kicker is a room moderator.
 *
 * @public
 *
 * @param roomAddress The address of the room
 * @param peerAddress The address of the peer to remove from the room
 */
function kickPeer(roomAddress, peerAddress) {
    return {
        payload: {
            peerAddress: peerAddress,
            roomAddress: roomAddress
        },
        type: Constants_1.KICK_PEER
    };
}
exports.kickPeer = kickPeer;
/**
 * @description
 * Set the overall volume limit for a peer.
 *
 * The volume limit must be between 0 and 1.
 *
 * @public
 *
 * @param peerAddress The address of the peer to adjust
 * @param volumeLimit The new volume limit, from 0 to 1 inclusive
 */
function limitPeerVolume(peerAddress, volumeLimit) {
    return {
        payload: {
            peerAddress: peerAddress,
            updated: {
                volumeLimit: volumeLimit
            }
        },
        type: Constants_1.PEER_UPDATED
    };
}
exports.limitPeerVolume = limitPeerVolume;
