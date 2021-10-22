<template>
  <form v-on:submit.prevent="submitForm" class="row">
    <div class="col-lg-2">
      <label for="count" class="form-label">Кол-во:</label>
      <input
          type="text"
          class="form-control form-control-sm"
          id="count" value="1"
          v-model.number="buyCount"
          pattern="\d+"
          oninvalid="this.setCustomValidity('Введите челове число')"
          oninput="this.setCustomValidity('')"
          required
      >
    </div>
    <div class="col-lg-2">
      <label for="item" class="form-label">Товар:</label>
      <select v-model.number="buyItemId" id="item" class="form-select form-select-sm" aria-label=".form-select-sm example">
        <option value="0" selected disabled>-- Выбререте товар --</option>
        <template v-for="category in goodsList">
          <option v-bind:key="'category' + category.id"  disabled>{{ category.title }}:</option>
          <option v-for="{id, title} in category.products" v-bind:key="id" v-bind:value="id">{{ title }}</option>
        </template>
      </select>
    </div>
    <div class="col-lg-2">
      <label for="fund" class="form-label">Валюта:</label>
      <select v-model.trim="buyFund" id="fund" class="form-select form-select-sm" aria-label=".form-select-sm" required>
        <option
            v-for="{name, disabled} of fundsList"
            v-bind:key="name"
            v-bind:disabled="disabled"
        >{{ name }}</option>
      </select>
    </div>
    <div class="col-lg-2">
      <label for="email" class="form-label">Email:</label>
      <input
          type="email"
          class="form-control form-control-sm"
          id="email"
          v-model.trim="buyEmail"
          oninvalid="this.setCustomValidity('Введите корректный Email')"
          oninput="this.setCustomValidity('')"
          placeholder="exmaple@mail.ru"
          required
      >
    </div>

    <div class="col-lg-2">
      <label for="promoCode" class="form-label">Промокод:</label>
      <input
          type="text"
          class="form-control form-control-sm"
          id="promoCode" value=""
          v-model.trim="buyPromo"
          pattern="[A-Z0-9-]+"
          placeholder="PROMO100"
          oninvalid="this.setCustomValidity('Введите правильный промокод')"
          oninput="this.setCustomValidity('')"
      >
    </div>

    <div class="col-auto">
      <button id="payButton" type="submit" class="btn btn-primary btn-sm">
        <i class="bi bi-credit-card-fill"></i>
        Оплатить
      </button>
    </div>
    <div class="row mt-2">
      <div class="col-auto">
        <div class="form-check">
          <input
              class="form-check-input"
              type="checkbox"
              v-model="buyRulesAgree"
              id="agree"
              oninvalid="this.setCustomValidity('Примите правила')"
              oninput="this.setCustomValidity('')"
              required
          >
          <label class="form-check-label" for="agree">
            Я согласен(-на) с
            <a href="/ru/public-offer" target="_blank">публичной офертой</a> и
            <a href="/ru/conditions" target="_blank">правилами</a>
          </label>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "OrderPanel",
  data () {
    return {
      buyFund: 'WMZ',
      agreeCheckbox: true,
      buyRulesAgree: false,
      buyCount: 1,
      buyItemId: 0,
      buyEmail: "d@m.ru",
      buyPromo: ""
    }
  },
  methods: {
    submitForm () {
      if(this.buyItemId === 0) {
        document.querySelector('#item').focus()
        return;
      }
      const {products: productCategory} = this.goodsList.find(({ products }) =>
          products.find(({ id }) => id === this.buyItemId) !== undefined
      );

      const {
        min: minCount,
        max: maxCount,
        title: productTitle,
        prices: productPrices
      } = productCategory.find(({ id }) => id === this.buyItemId);

      let { equal: currecny } = this.fundsList.find(({name}) => name === this.buyFund);

      if(minCount > this.buyCount) {
        return this.$swal({ icon: 'error', text: `Минимальное количество для покупки ${minCount} шт.`})
      } else if(maxCount < this.buyCount) {
        return this.$swal({ icon: 'error', text: `Максимальное количество для покупки ${maxCount} шт.`})
      }


      this.$swal.fire({
        title: '<strong>Подтверждение покупки</strong>',
        html:
        `<ul class="list-group text-start">
            <li class="list-group-item"><i class="bi bi-cart4"></i> <b>Товар:</b> ${ productTitle }</li>
            <li class="list-group-item"><i class="bi bi-grid-3x3-gap"></i> <b>Количество:</b> ${ this.buyCount } шт.</li>
            <li class="list-group-item"><i class="bi bi-currency-exchange"></i> <b>Валюта:</b> ${ this.buyFund }</li>` +
            (this.buyPromo ? `<li class="list-group-item"><i class="bi bi-currency-exchange"></i> <b>Промокод:</b> ${ this.buyPromo }</li>` : '') +
            `<li class="list-group-item"><i class="bi bi-at"></i> <b>Email:</b> ${this.buyEmail}</li>
            <li class="list-group-item"><i class="bi bi-cash-coin"></i> <b>Итого:</b> ${ this.buyCount * productPrices[currecny]} ${ this.buyFund }</li>
          </ul>`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: 'var(--bs-gray-dark)',
        cancelButtonColor: 'var(--bs-red)',
        focusConfirm: true,
        allowOutsideClick: false,
        confirmButtonText: '<i class="bi bi-check-lg"></i> Подтверждаю',
        confirmButtonAriaLabel: 'Подтверждаю',
        cancelButtonText: '<i class="bi bi-arrow-90deg-left"></i> Отмена',
        cancelButtonAriaLabel: 'Отмена',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const preventHandler = (event) => {
            // Отмените событие, как указано в стандарте.
            event.preventDefault();
            // Chrome требует установки возвратного значения.
            event.returnValue = '';
          };
          window.addEventListener('beforeunload', preventHandler);
          return this.$swal.fire({
            title: '<strong>Оплата</strong>',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            showCloseButton: false,
            showCancelButton: true,
            confirmButtonText: '<i class="bi bi-arrow-repeat"></i> Проверить платеж',
            confirmButtonColor: 'var(--bs-success)',
            cancelButtonText: '<i class="bi bi-x-square-fill"></i> Отмена',
            cancelButtonColor: 'var(--bs-red)',
            preConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  this.$swal.showValidationMessage('Платеж не найден');
                  resolve();
                }, 3000)
              })
            },
            html:
                `<div class="form-floating mb-3">
                   <input
                      type="text"
                      onclick="this.select()"
                      class="form-control"
                      id="moneyToPay"
                      value="${this.buyCount * productPrices[currecny]}"
                      readonly
                   >
                 <label for="floatingInputValue">К оплате <strong>${this.buyFund}</strong></label>
                 </div>` +
                `<div class="form-floating mb-3">
                   <input
                      type="text"
                      onclick="this.select()"
                      class="form-control"
                      id="moneyToPay"
                      value="R12346789"
                      readonly
                   >
                 <label for="floatingInputValue">Кошелек для платежа</label>
                 </div>` +
                `<div class="form-floating mb-3">
                   <input
                      type="text"
                      onclick="this.select()"
                      class="form-control"
                      id="moneyToPay"
                      value="bill[${Math.random().toString(36).slice(7)}]"
                      readonly
                   >
                 <label for="floatingInputValue">Примечание к платежу</label>
                 </div>`,
          }).then((result) => {
            if(result.isDismissed){
              window.removeEventListener('beforeunload', preventHandler)
            }
          });
          /*this.$swal.showValidationMessage(
              `Товара нет в наличии`
          );*/
        }
      })
    }
  },
  props: {
    goodsList: {
      type: Array,
      required: true,
    },
    fundsList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  #payButton {
    margin-top: 32px;
    width: 100px;
  }
</style>
