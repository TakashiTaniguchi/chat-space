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

      it 'redirects to new_user_session_path' do
      end
    end
  end
end
