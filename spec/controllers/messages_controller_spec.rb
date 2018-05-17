require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login_user user
      end

      it 'assigns @group' do
      end

      it 'assigns @message' do
      end

      it 'renders index' do
      end
    end

    context 'not log in' do
      it 'redirects to new_user_session_path' do
      end
    end
  end
end
