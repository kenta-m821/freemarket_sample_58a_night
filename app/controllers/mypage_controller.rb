class MypageController < ApplicationController
  before_action :apply_gon
  before_action :set_user, only: [:exhibiting, :sold, :purchased, :profile]
  before_action :set_parents

  def show # マイページ
  end

  def exhibiting # 出品した商品 - 出品中
    @product = @user.products.where.not(transaction_status: 1).page(params[:page]).per(12).order("created_at DESC")
    respond_to do |format|
      format.html
      format.js
    end
  end

  def sold #出品した商品 - 売却済み
    @product = @user.products.where(transaction_status: 1).page(params[:page]).per(12).order("created_at DESC")
    respond_to do |format|
      format.html
      format.js
    end
  end

  def purchased #購入した商品 - 過去の取引
    @product = Product.all.where(buyer_id: current_user.id).page(params[:page]).per(12).order("created_at DESC")
    respond_to do |format|
      format.html
      format.js
    end
  end

  def card # 支払い方法
  end

  def identification # 本人確認
  end

  def profile # プロフィール
  end

  def logout # ログアウト
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def apply_gon
    gon.payjp_key = ENV["PAYJP_KEY"]
  end
end
