import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext} from '@ngxs/store';
import { ShowLoading, UpdateUserName } from './app.actions';

export interface AppStateModel {
    loading: boolean;
    userName?: string;
    token?: string;
}

@State<AppStateModel>({
    name: 'app',
    defaults: { loading: false, userName: "Ragul" },
})

@Injectable({ providedIn: 'root' })

export class AppState {
    @Selector() static loading(state: AppStateModel) { 
        return state.loading; 
    }
    
    @Selector() static userName(state: AppStateModel) {
        return state.userName;
    }
    
    @Action(ShowLoading)
    showLoading(
        { patchState }: StateContext<AppStateModel>,
        { loading }: ShowLoading
    ) {
        return patchState({ loading });
    }

    @Action(UpdateUserName)
    updateUserName(
        { patchState }: StateContext<AppStateModel>,
        { userName }: UpdateUserName
    ) {
        return patchState({ userName });
    }
}


