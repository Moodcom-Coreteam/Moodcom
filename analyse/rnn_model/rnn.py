import re
import string
from tensorflow.keras import losses
import tensorflow as tf
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization

def custom_standardization(input_data):
  lowercase = tf.strings.lower(input_data)
  stripped_html = tf.strings.regex_replace(lowercase, '<br />', ' ')
  return tf.strings.regex_replace(stripped_html, '[%s]' % re.escape(string.punctuation), '')

def rnnModel():
    with tf.keras.utils.custom_object_scope({'custom_standardization': custom_standardization}):
        export_model = tf.keras.models.load_model('rnn_model/my_model')

    export_model.compile(loss = 'categorical_crossentropy', optimizer = 'adam', metrics = ['accuracy'])
    
    return export_model