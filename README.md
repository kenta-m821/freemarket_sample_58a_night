# freemarket_sample_58a_night
プログラミングスクールTECH::EXPERTの最終課題でフリーマーケットサイトを作成しました。
# リンク
http://3.113.61.111/

BASIC認証をかけています。ご覧の際は下記のIDとPassを入力してください。
+ BASIC認証
  + ID:58anight
  + Pass:58anight

# テストユーザー
+ 購入用アカウント
  + メールアドレス:buyer@test.com  
  + パスワード:buyer123
+ 購入用カード情報
  + 番号:4242424242424242
  + 期限:12/20
  + セキュリティコード:123
+ 出品用アカウント
  + メールアドレス:seller@test.com  
  + パスワード:seller123

# kenta-m821の担当箇所
## ユーザー
### ユーザー新規登録機能
+ sessionを用いてウィザード形式のユーザー登録機能を実装しました。
+ クレジットカードの登録は[PAY.JPの外部APIを使用](https://github.com/tiphp452/freemarket_sample_58a_night/blob/master/app/assets/javascripts/payjp.js)しています。

### ユーザーログイン機能
+ ReCAPTCHAを導入しました。
### SNS認証機能(開発環境のみ)
+ gem omniauth-rails_csrf_protection等を用いてgoogleもしくはfacebookのSNS認証によるログイン機能を実装しました。
### ログアウト機能
### マイページ

## 商品
### 商品詳細機能
+ 複数サムネイルの画像切り替えを実装しました。
### インクリメンタルサーチ
![c09a2986f4ae3b18c480b4be520b31f6](https://user-images.githubusercontent.com/54160947/73591342-ce4b2780-4530-11ea-87c6-599ecd933fca.gif)
+ 出品時のブランド名検索を非同期通信で実装しました。

## その他
### ユーザー関係のバリデーション
![e615c98956245ce779573e5cded0786e](https://user-images.githubusercontent.com/54160947/73591427-b45e1480-4531-11ea-9248-122ad8147065.gif)

[jQueryによる動的なバリデーションチェック](https://github.com/tiphp452/freemarket_sample_58a_night/blob/master/app/assets/javascripts/jquery.validate.handler.user.js)を実装しました。
### 単体テスト
+ ユーザー管理、商品一覧機能、商品詳細機能、商品購入機能の単体テスト
+ PAY.JPの[レスポンスモック](https://github.com/tiphp452/freemarket_sample_58a_night/blob/master/spec/support/payjp_mock.rb)の作成
### デプロイ
+ AWS EC2, S3
+ Capistranoによる自動デプロイ

# DB設計
## ER図
![freemarket_sample_58a_night ER図](https://user-images.githubusercontent.com/54708394/73121017-d1866680-3fb8-11ea-8762-e36d25af5e3d.jpeg)

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
|avatar|string||
|introduction|text||
|lastname|string|null: false|
|firstname|string|null: false|
|lastname_kana|string|null: false|
|firstname_kana|string|null: false|
|birth_year|integer|null: false|
|birth_month|integer|null: false|
|birth_day|integer|null: false|
|phone|string|unique: true|
### Association
- has_one :address, dependent: :destroy
- has_one :credit_card, dependent: :destroy
- has_one :sns_credential, dependent: :destroy
- has_many :products
- has_many :comments

## addressesテーブル
|Column|Type|Options|
|------|----|-------|
|postal_code|string|null: false|
|prefecture|string|null: false|
|city|string|null: false|
|street|string|null: false|
|building_name|string||
|phone_optional|string||
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user, inverse_of: :address

## cardsテーブル
|Column|Type|Options|
|------|----|-------|
|card_id|string|null: false|
|customer_id|string|null: false|
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user

## sns_credentialsテーブル
|Column|Type|Options|
|------|----|-------|
|uid|string|null: false|
|provider|string|null: false|
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user

## productsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|description|text|null: false|
|category|references|null: false, foreign_key: true|
|size|references|foreign_key: true|
|brand|references|foreign_key: true|
|condition|string|null: false|
|delivery_cost|string|null: false|
|delivery_way|string|null: false|
|delivery_origin|string|null: false|
|preparatory_days|string|null: false|
|price|integer|null: false|
|user|references|null: false, foreign_key: true|
|transaction_status|integer|default: 0|
|buyer_id|integer||
### Association
- belongs_to :user
- belongs_to :category
- belongs_to :size, optional: true
- belongs_to :brand
- has_many :images, dependent: :destroy
- accepts_nested_attributes_for :images, allow_destroy: true
- has_many :comments, dependent: :destroy

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user|references|null: false, foreign_key: true|
|product|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :product

## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|product|references|null: false, foreign_key: true|
### Association
- belongs_to :product, inverse_of: :images

## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|ancestory|references|null: false, foreign_key: true|
### Association
- has_many :products
- has_many :category_sizes
- has_many :sizes, through: :category_sizes
- has_ancestory

## sizesテーブル
|Column|Type|Options|
|------|----|-------|
|size|string||
|ancestry|references|null: false, foreign_key: true|
### Association
- has_many :products
- has_many :category_sizes
- has_many :categories, through: :category_sizes
- has_ancestry

## category_sizesテーブル
|Column|Type|Options|
|------|----|-------|
|category|references|foreign_key: true|
|size|references|foreign_key: true|
### Association
- belongs_to :category
- belongs_to :size

## brandsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :products