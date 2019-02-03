import * as api from '../api'

// 비동기 액션 정의
// commit하면 mutation(변이) 호출
const actions = {
    ADD_BOARD(_, { title }) {
        return api.board.create(title)
                .then(data => data.item);
    },
    FETCH_BOARDS({ commit }) {
        return api.board.fetch().then(data => {
            commit('SET_BOARDS', data.list)
        });
    },
    FETCH_BOARD({ commit }, {id}) {
        return api.board.fetch(id).then(data => {
            commit('SET_BOARD', data.item)
        });
    },
    ADD_CARD({ dispatch, state }, {title, listId, pos}) {
        return api.card.create(title, listId, pos)
            .then(() => dispatch('FETCH_BOARD', {id: state.board.id}))
    },
    LOGIN({ commit }, {email,password}) {
        return api.auth.login(email, password)
        .then(({accessToken}) => 
            commit('LOGIN', accessToken)
        );
    },
    FETCH_CARD({ commit }, {id}) {
        return api.card.fetch(id).then(data=> {
            debugger;
            commit('SET_CARD', data.item)
        })
    }
}

export default actions;