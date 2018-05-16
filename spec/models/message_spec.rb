require 'rails_helper'
describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it "is valid without image" do
        expect(build(:message, image: nil)).to be_valid
      end
      it "is valid without body" do
        expect(build(:message, body: nil)).to be_valid
      end
      it "is valid with body and image" do
        expect(build(:message)).to be_valid
      end
    end
  end
end
