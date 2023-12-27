import telebot
from telebot import types
from currency_converter import CurrencyConverter
import webbrowser

bot = telebot.TeleBot('TOKEN')
currency = CurrencyConverter()
amount = 0


@bot.message_handler(commands=['music', 'chain'])
def site(message):
    webbrowser.open('https://www.youtube.com/watch?v=JDG2m5hN1vo')


@bot.message_handler(commands=['start', 'hello'])
def main(message):
    bot.send_message(message.chat.id, f'Hello '
                                      f'{message.from_user.first_name} '
                                      f'{message.from_user.last_name}! Enter count of money:')
    bot.register_next_step_handler(message, summa)


def summa(message):
    global amount
    try:
        amount = int(message.text.strip())
    except ValueError:
        bot.send_message(message.chat.id, 'Wrong format, please enter number!')
        bot.register_next_step_handler(message, summa)
        return

    if amount > 0:
        markup = types.InlineKeyboardMarkup(row_width=2)
        btn1 = types.InlineKeyboardButton('USD/EUR', callback_data='usd/eur')
        btn2 = types.InlineKeyboardButton('EUR/USD', callback_data='eur/usd')
        btn3 = types.InlineKeyboardButton('USD/CHF', callback_data='usd/chf')
        btn4 = types.InlineKeyboardButton('CHF/USD', callback_data='chf/usd')
        btn5 = types.InlineKeyboardButton('USD/GBP', callback_data='usd/gbp')
        btn6 = types.InlineKeyboardButton('GBP/USD', callback_data='gbp/usd')
        btn7 = types.InlineKeyboardButton('Another sense of money transfer', callback_data='else')
        markup.add(btn1, btn2, btn3, btn4, btn5, btn6, btn7)
        bot.send_message(message.chat.id, 'Choose the button', reply_markup=markup)
    else:
        bot.send_message(message.chat.id, 'The value of the number must be greater than 0!')
        bot.register_next_step_handler(message, summa)


@bot.callback_query_handler(func=lambda call: True)
def callback(call):
    if call.data != 'else':
        values = call.data.upper().split('/')
        res = currency.convert(amount, values[0], values[1])
        bot.send_message(call.message.chat.id, f'Result is - {round(res, 2)}. You can write another transfer operation.')
        bot.register_next_step_handler(call.message, summa)
    else:
        bot.send_message(call.message.chat.id, 'Enter two values:')
        bot.register_next_step_handler(call.message, my_currency)


def my_currency(message):
    try:
        values = message.text.upper().split('/')
        res = currency.convert(amount, values[0], values[1])
        bot.send_message(message.chat.id, f'Result is - {round(res, 2)}. You can write another transfer operation.')
        bot.register_next_step_handler(message, summa)
    except Exception:
        bot.send_message(message.chat.id, 'Something wrong! Enter new values!')
        bot.register_next_step_handler(message, my_currency)


bot.infinity_polling()


