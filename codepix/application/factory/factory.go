package factory

import (
	"github.com/jinzhu/gorm"
	"github.com/npmacedo/imersao-fc-codepix/application/usecase"
	"github.com/npmacedo/imersao-fc-codepix/infrastructure/repository"
)

func TransactionUseCaseFactory(database *gorm.DB) usecase.TransactionUseCase {
	pixRepository := repository.PixKeyRepositoryDb{Db: database}
	transactionRepository := repository.TransactionRepositoryDb{Db: database}

	transactionUseCase := usecase.TransactionUseCase{
		TransactionRepository: transactionRepository,
		PixRepository:         pixRepository,
	}

	return transactionUseCase
}
