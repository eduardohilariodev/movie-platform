<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vMaska } from 'maska/vue'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useCurrency } from '@/composables/currency'
const cartStore = useCartStore()
const { getCartItems, isSuccessDialogOpen } = storeToRefs(cartStore)

const { formatCurrency } = useCurrency()

const formSchema = toTypedSchema(
  z.object({
    fullName: z
      .string()
      .min(2, 'Nome completo deve ter pelo menos 2 caracteres')
      .max(50)
      .default(''),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
      .default(''),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número de telefone inválido')
      .default(''),
    email: z.string().email('Por favor, insira um email válido').default(''),
    cep: z
      .string()
      .regex(/^\d{2}\.\d{3}-\d{3}$/, 'CEP inválido')
      .default(''),
    address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres').default(''),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres').default(''),
    state: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres').default(''),
  }),
)

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    city: '',
    state: '',
  },
})

const onSubmit = handleSubmit((values) => {
  const cleanedValues = {
    ...values,
    cpf: values.cpf.replace(/\D/g, ''),
    phone: values.phone.replace(/\D/g, ''),
    cep: values.cep.replace(/\D/g, ''),
  }

  console.log('Form submitted!', cleanedValues)

  cartStore.startCheckout()
})
</script>

<template>
  <div class="container mx-auto my-8 p-4">
    <h1 class="mb-6 text-2xl font-bold">Finalizar Compra</h1>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div class="rounded-lg bg-white p-6 shadow">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <FormField v-slot="{ componentField }" name="fullName">
            <FormItem>
              <FormControl>
                <input
                  type="text"
                  class="w-full rounded-md border px-3 py-2"
                  placeholder="Nome Completo"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="cpf">
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    class="w-full rounded-md border px-3 py-2"
                    placeholder="CPF"
                    v-maska="'###.###.###-##'"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    class="w-full rounded-md border px-3 py-2"
                    placeholder="Celular"
                    v-maska="{
                      mask: (value) => (value.length > 14 ? '(##) #####-####' : '(##) ####-####'),
                      eager: true,
                    }"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormControl>
                <input
                  type="email"
                  class="w-full rounded-md border px-3 py-2"
                  placeholder="E-mail"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="grid grid-cols-3 gap-4">
            <FormField v-slot="{ componentField }" name="cep">
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    class="w-full rounded-md border px-3 py-2"
                    placeholder="CEP"
                    v-maska="'##.###-###'"
                    inputmode="numeric"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="address" class="col-span-2">
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    class="w-full rounded-md border px-3 py-2"
                    placeholder="Endereço"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="city">
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    class="w-full rounded-md border px-3 py-2"
                    placeholder="Cidade"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="state">
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    class="w-full rounded-md border px-3 py-2"
                    placeholder="Estado"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </form>
      </div>

      <div class="rounded-lg bg-white p-6 shadow">
        <div v-if="getCartItems.length > 0">
          <div class="mb-4 grid grid-cols-4 gap-2 font-semibold">
            <div>Imagem</div>
            <div>Nome</div>
            <div>Qtd</div>
            <div>Preço</div>
          </div>

          <div
            v-for="item in getCartItems"
            :key="item.id"
            class="mb-4 grid grid-cols-4 items-center gap-2 border-b pb-4"
          >
            <div class="flex h-16 w-16 items-center justify-center bg-gray-100">
              <img
                v-if="item.posterPath"
                :src="item.posterPath"
                alt="Poster"
                class="h-full w-full object-cover"
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-gray-400"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <div>{{ item.title }}</div>
            <div>1</div>
            <div class="flex items-center justify-between">
              <span>{{ formatCurrency(item.price) }}</span>
              <button @click="cartStore.removeItem(item)" class="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <div class="text-lg font-bold">Total:</div>
            <div class="text-xl font-bold">
              {{ formatCurrency(Number(cartStore.totalPrice)) }}
            </div>
          </div>

          <Button type="submit" class="mt-6 w-full" @click="onSubmit"> Finalizar compra </Button>
        </div>
        <div v-else class="py-8 text-center text-gray-500">Seu carrinho está vazio</div>
      </div>
    </div>
  </div>

  <AlertDialog :open="isSuccessDialogOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Obrigado, {{ values.fullName }}!</AlertDialogTitle>
        <AlertDialogDescription> Sua compra foi finalizada com sucesso! </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction @click="cartStore.finishCheckout">Ir para a loja</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
