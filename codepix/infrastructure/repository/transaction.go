package repository

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"github.com/npmacedo/imersao-fc-codepix/domain/model"
)

type TransactionRepositoryDb struct {
	Db *gorm.DB
}

func (r PixKeyRepositoryDb) Register(transaction *model.Transaction) error {
	err := r.Db.Create(transaction).Error
	if err != nil {
		return err
	}
	return nil
}

func (r PixKeyRepositoryDb) Save(transaction *model.Transaction) error {
	err := r.Db.Save(transaction).Error
	if err != nil {
		return err
	}
	return nil
}

func (r PixKeyRepositoryDb) Find(id string) (*model.Transaction, error) {
	var transaction model.Transaction

	r.Db.Preload("Account.Bank").First(&transaction, "id = ?", id)

	if transaction.ID == "" {
		return nil, fmt.Errorf("no transaction was found")
	}

	return &transaction, nil
}
