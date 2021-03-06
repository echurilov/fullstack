class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.home = Server.create('owner_id': @user.id, 'name': 'Home')
    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: @user.errors.messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
