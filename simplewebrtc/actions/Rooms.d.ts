import { ThunkAction } from 'redux-thunk';
import { DESTROY_ROOM, JOIN_ROOM, JOIN_ROOM_FAILED, JOIN_ROOM_SUCCESS, LEAVE_ROOM, LOCK_ROOM, ROOM_LOCKED, ROOM_UNLOCKED, UNLOCK_ROOM } from '../Constants';
import { RoomConfig } from '../Definitions';
import { State } from '../reducers';
export interface JoinRoom {
    type: typeof JOIN_ROOM;
    payload: {
        providedRoomName: string;
        providedPassword?: string;
        roomAddress: string;
        password?: string;
        autoJoinCall?: boolean;
    };
}
export interface JoinRoomSuccess {
    type: typeof JOIN_ROOM_SUCCESS;
    payload: {
        id: string;
        role: string;
        roomAddress: string;
        selfAddress: string;
    };
}
export interface JoinRoomFailed {
    type: typeof JOIN_ROOM_FAILED;
    payload: {
        roomAddress: string;
        passwordRequired?: boolean;
    };
}
export interface LeaveRoom {
    type: typeof LEAVE_ROOM;
    payload: {
        roomAddress: string;
    };
}
export interface LockRoom {
    type: typeof LOCK_ROOM;
    payload: {
        roomAddress: string;
        password: string;
    };
}
export interface UnlockRoom {
    type: typeof UNLOCK_ROOM;
    payload: {
        roomAddress: string;
    };
}
export interface DestroyRoom {
    type: typeof DESTROY_ROOM;
    payload: {
        roomAddress: string;
    };
}
export interface RoomLocked {
    type: typeof ROOM_LOCKED;
    payload: {
        roomAddress: string;
        password: string;
    };
}
export interface RoomUnlocked {
    type: typeof ROOM_UNLOCKED;
    payload: {
        roomAddress: string;
    };
}
export declare type Actions = JoinRoom | JoinRoomFailed | LeaveRoom | LockRoom | UnlockRoom | RoomLocked | RoomUnlocked;
/**
 * Fetch room configuration from the API.
 *
 * @private
 *
 * @param configUrl string
 * @param roomName string
 * @param auth string
 * @param maxTries number
 * @param timeout number
 */
export declare function fetchRoomConfig(configUrl: string, roomName: string, auth: string, maxTries?: number, timeout?: number): Promise<RoomConfig>;
/**
 * @description
 * Attempt to join a room.
 *
 * @public
 *
 * @param roomAddress A user-friendly name for a room
 */
export declare function joinRoom(roomName: string, opts?: JoinRoomOptions): ThunkAction<void, State, void, JoinRoom | JoinRoomFailed>;
export interface JoinRoomOptions {
    password?: string;
    autoJoinCall?: boolean;
}
/**
 * An attempt to join a room failed.
 *
 * If a password is required to join the room, `passwordRequired` should be set to `true`.
 *
 * @private
 *
 * @param roomAddress string
 * @param passwordRequired boolean
 */
export declare function joinRoomFailed(roomAddress: string, passwordRequired: boolean): JoinRoomFailed;
/**
 * The attempt to join a room succeeded.
 *
 * @private
 *
 * @param roomAddress string
 */
export declare function joinRoomSuccess(roomAddress: string, selfAddress: string, roomId: string, role: string): ThunkAction<void, State, void, JoinRoomSuccess>;
/**
 * @description
 * Leave a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to leave
 */
export declare function leaveRoom(roomAddress: string): ThunkAction<void, State, void, LeaveRoom>;
/**
 * @description
 * Lock a room.
 *
 * @public
 *
 * @param roomAddress The address of the room to lock
 * @param password The new room password
 */
export declare function lockRoom(roomAddress: string, password: string): ThunkAction<void, State, void, LockRoom>;
/**
 * @description
 * Unlock a room to allow anyone to enter without needing a password.
 *
 * @public
 *
 * @param roomAddress The address of the room to unlock
 */
export declare function unlockRoom(roomAddress: string): ThunkAction<void, State, void, UnlockRoom>;
/**
 * @description
 * Destroy a room.
 *
 * @public
 *
 * @param roomAddress  The address of the room to destroy
 */
export declare function destroyRoom(roomAddress: string): ThunkAction<void, State, void, DestroyRoom>;
/**
 * Room has been locked.
 *
 * @private
 *
 * @param roomAddress string
 * @param password string
 */
export declare function roomLocked(roomAddress: string, password: string): RoomLocked;
/**
 * Room has been unlocked.
 *
 * @private
 *
 * @param roomAddress string
 */
export declare function roomUnlocked(roomAddress: string): RoomUnlocked;
