<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { cn } from '@utils/ui-shadcn.util'
import { Check, ChevronDown, LoaderCircle } from 'lucide-vue-next'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@common/ui/command'
import { Button } from '@common/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@common/ui/popover'
import {
  TagsInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@common/ui/tags-input'

const props = defineProps({
  options: { type: Array, required: false },
  placeholder: { type: String, required: false, default: 'Select...' },
  defaultValues: {
    type: Array,
    required: false,
    default() {
      return []
    }
  },
  loading: { type: Boolean, required: false, default: false },
  lazy: { type: Boolean, required: false, default: false },
  labelKey: { type: String, required: false, default: 'label' },
  valueKey: { type: String, required: false, default: 'value' },
  hasAllOption: { type: Boolean, required: false, default: false },
  triggerClass: { type: String, required: false, default: '' },
  isError: { type: Boolean, required: false, default: false },
  isTagSelect: { type: Boolean, required: false, default: false },
  returnFullOption: { type: Boolean, required: false, default: false },
  searchKeys: { type: Array, required: false, default: () => [] },
  values: {
    type: Array,
    required: false,
    default() {
      return []
    }
  },
  popoverContentConfig: { type: Object, required: false, default: () => ({}) }
})

const emits = defineEmits(['scrollToBottom', 'change'])

const isOpen = ref(false)
//to reset the state if user closes popup without clicking apply button
const oldState = reactive({
  isSelectAll: false,
  selectedValues: []
})

const currentState = reactive({
  isSelectAll: false,
  selectedValues: props.defaultValues
})

const handleSelect = (item) => {
  const index = currentState.selectedValues.findIndex(
    (i) => i[props.valueKey] === item[props.valueKey]
  )
  if (index > -1) {
    currentState.selectedValues.splice(index, 1)
  } else {
    currentState.selectedValues.push(item)
  }
}

const label = computed(() => {
  if (currentState.isSelectAll) {
    return 'All'
  }
  if (currentState.selectedValues.length) {
    return currentState.selectedValues.map((item) => item[props.labelKey]).join(', ')
  }
  return props.placeholder
})

const openPopup = () => {
  isOpen.value = true
}

const closePopup = () => {
  isOpen.value = false
}

const handleChangeOpenState = (openState) => {
  // when user close by clicking outside
  if (!openState) {
    currentState.selectedValues.splice(
      0,
      currentState.selectedValues.length,
      ...oldState.selectedValues
    )
    currentState.isSelectAll = oldState.isSelectAll
    closePopup()
    // when user open
  } else {
    oldState.selectedValues.splice(
      0,
      oldState.selectedValues.length,
      ...currentState.selectedValues
    )
    oldState.isSelectAll = currentState.isSelectAll
  }
}

const handleClear = () => {
  currentState.selectedValues.splice(0, currentState.selectedValues.length)
  currentState.isSelectAll = false
}

const handleApply = () => {
  closePopup()
  if (props.returnFullOption) {
    emits('change', currentState.selectedValues)
  } else {
    emits(
      'change',
      currentState.selectedValues.map((i) => i[props.valueKey])
    )
  }
}

const handleSelectAll = () => {
  if (currentState.isSelectAll) {
    handleClear()
  } else {
    currentState.isSelectAll = true
    currentState.selectedValues.splice(0, currentState.selectedValues.length, ...props.options)
  }
}

watch(
  () => currentState.selectedValues,
  (newValue) => {
    if (newValue.length && newValue.length === props.options.length) {
      currentState.isSelectAll = true
    } else {
      currentState.isSelectAll = false
    }
  },
  { deep: true, immediate: true }
)

const handleScroll = (e) => {
  const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
  if (props.lazy && bottom < 2 && !props.loading) {
    emits('scrollToBottom')
  }
}

const handleDeleteTag = (item) => {
  const newSelectedValues = currentState.selectedValues.filter(
    (val) => val[props.valueKey] != item[props.valueKey]
  )
  currentState.selectedValues = [...newSelectedValues]

  if (!isOpen.value) {
    const newValues = props.returnFullOption
      ? newSelectedValues
      : newSelectedValues.map((item) => item[props.valueKey])

    emits('change', newValues)
  }
}

watch(
  () => [props.values, props.options],
  () => {
    if (props?.values && props?.options?.length) {
      const list = props.values.map((item) => {
        // if default value is an object that has both valueKey and labelKey
        if (item[props.valueKey] && item[props.labelKey]) {
          return item
          // if default value is a valueKey string
        } else {
          let find = props.options.find((i) => i[props.valueKey] === item)
          if (find) {
            return find
          }
        }
      })

      currentState.selectedValues = [...list]
    }
  },
  {
    immediate: true
  }
)

function filterFunction(list, searchTerm) {
  if (props.searchKeys.length) {
    return props.options
      .filter((option) =>
        props.searchKeys.some((key) =>
          option[key]?.toString().toLowerCase()?.includes(searchTerm.toLowerCase())
        )
      )
      .map((option) => option[props.valueKey])
  }
  return props.options
    .filter((option) =>
      option[props.labelKey]?.toString().toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    .map((option) => option[props.valueKey])
}
// TODO: handle search via api
</script>

<template>
  <Popover :open="isOpen" @update:open="(openState) => handleChangeOpenState(openState)">
    <PopoverTrigger as-child>
      <slot name="popover-trigger" :open-popup="openPopup">
        <Button
          variant="outline"
          role="combobox"
          :class="
            cn(
              'w-full gap-[10px] min-h-[36px] items-center justify-start border-grey-400 py-1 px-3 pr-6 overflow-hidden relative font-normal !mt-[5px]',
              !currentState.selectedValues.length && 'text-muted-foreground',
              isError ? 'border-destructive' : 'border-input',
              triggerClass
            )
          "
          @click="openPopup"
        >
          <template v-if="isTagSelect">
            <TagsInput
              v-if="currentState.selectedValues?.length"
              class="flex gap-2 rounded-none flex-wrap border-0 items-center p-0 grow max-w-full max-h-[58.5px] overflow-y-auto mr-4"
              :model-value="currentState.selectedValues"
            >
              <TagsInputItem
                v-for="item in currentState.selectedValues"
                :key="`${item[props.valueKey]}-${item[props.labelKey]}`"
                :value="String(item[props.labelKey])"
                class="flex items-center justify-center gap-1 text-grey-700 bg-grey-50 aria-[current=true]:bg-grey-50 border border-grey-100 rounded-full px-1 h-auto data-[state=active]:ring-1 data-[state=active]:ring-grey-700 max-w-[150px] cursor-auto select-text"
                @click.stop
              >
                <slot name="selected-item-content" :item="item">
                  <TagsInputItemText
                    as="p"
                    :title="String(item[props.labelKey])"
                    class="truncate max-w-full py-0 leading-[22px]"
                  />
                </slot>
                <TagsInputItemDelete @click="() => handleDeleteTag(item)" />
              </TagsInputItem>
            </TagsInput>
            <span v-else class="placeholder-placeholder text-base leading-none">{{
              placeholder
            }}</span>
          </template>
          <span
            v-else
            :title="label"
            class="font-normal text-[13px] leading-[24px] truncate max-w-[95%]"
            >{{ label }}</span
          >
          <div class="absolute ml-auto h-full flex right-0 pr-3 pl-2 items-center">
            <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </slot>
    </PopoverTrigger>
    <PopoverContent
      :side-offset="5"
      :class="['p-0', 'popoverContent_full_width h-[224px]']"
      v-bind="popoverContentConfig"
    >
      <Command multiple :filter-function="filterFunction" class="max-h-[168px]">
        <CommandList v-if="hasAllOption">
          <CommandGroup>
            <CommandItem
              key="all"
              value="all"
              class="data-[highlighted]:bg-grey-50"
              @select="handleSelectAll"
            >
              <Check
                v-if="currentState.isSelectAll"
                :class="
                  cn(
                    'mr-2 h-[14px] w-[14px] rounded-[2px] bg-accent text-background',
                    currentState.isSelectAll ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
              <div v-else class="border-[1px] mr-2 rounded-[2px] h-[14px] w-[14px]" />
              All
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandSeparator v-if="hasAllOption" />
        <CommandInput placeholder="Search" />
        <CommandEmpty>{{ $t('common.no_results_found') }}</CommandEmpty>
        <CommandList @scroll="handleScroll">
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option[valueKey]"
              :value="option[valueKey]"
              class="data-[highlighted]:bg-grey-50"
              @select.prevent="
                () => {
                  handleSelect(option)
                }
              "
            >
              <Check
                v-if="
                  currentState.selectedValues.find((item) => item[valueKey] === option[valueKey]) ||
                  currentState.isSelectAll
                "
                :class="
                  cn(
                    'mr-2 h-[14px] w-[14px] rounded-[2px] text-primary-blue border border-primary-blue flex-shrink-0',
                    currentState.selectedValues.find(
                      (item) => item[valueKey] === option[valueKey]
                    ) || currentState.isSelectAll
                      ? 'opacity-100'
                      : 'opacity-0'
                  )
                "
              />
              <div
                v-else
                class="border-[1px] mr-2 rounded-[2px] h-[14px] w-[14px] border-grey-100 flex-shrink-0"
              />
              <slot
                name="option-content"
                :option="option"
                :label-key="labelKey"
                :value-key="valueKey"
              >
                <span :title="option[labelKey]" class="truncate text-secondary">{{
                  option[labelKey]
                }}</span>
              </slot>
            </CommandItem>
            <div v-if="loading" class="flex justify-center my-2">
              <LoaderCircle class="animate-spin" />
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
      <CommandSeparator />
      <div class="px-[15px] py-[10px] flex justify-between">
        <Button variant="ghost" @click="handleClear">Clear</Button>
        <Button @click="handleApply" variant="destructive">Apply</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
