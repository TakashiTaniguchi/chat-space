require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) { create(:user) }
  let(:group) { create(:group) }

  describe '#index' do

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

  describe '#create' do
    context 'log in' do
      before do
        login_user user
      end

      context 'can save' do
      end

      context 'can not save' do
      end
    end

    context 'not log in' do
    end
  end
end
