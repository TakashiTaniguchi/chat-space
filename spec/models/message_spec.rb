require 'rails_helper'
describe Message do
  describe '#create' do
    context 'can save' do
      it "is valid without image" do
        expect(build(:message, image: nil)).to be_valid
      end
    end
  end
end
