require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) { create(:user) }
  let(:group) { create(:group) }

  describe 'GET #index' do

    context 'log in' do
      before do
        login_user user
        get :index, params: { group_id: group.id }
      end

      it 'assigns the requested group to @group' do
        expect(assigns(:group)).to eq group
      end

      it 'assigns a new message to @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'renders the :index template' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to the new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'POST #create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login_user user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'increases the count of the messages' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to the group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path)
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not increase the count of the messages' do
          expect{ subject }.not_to change(Message, :count)
        end
      end
    end

    context 'not log in' do
      it 'redirects to the new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
