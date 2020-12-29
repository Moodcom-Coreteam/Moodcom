import tensorflow as tf
import re
import string
from tensorflow.keras import losses
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization
def custom_standardization(input_data):
  lowercase = tf.strings.lower(input_data)
  stripped_html = tf.strings.regex_replace(lowercase, '<br />', ' ')
  return tf.strings.regex_replace(stripped_html,
                                  '[%s]' % re.escape(string.punctuation),
                                  '')
def rnnModel():
    max_features = 10000
    sequence_length = 250
    vectorize_layer = TextVectorization(
        standardize=custom_standardization,
        max_tokens=max_features,
        output_mode='int',
        output_sequence_length=sequence_length)
    export_model = tf.keras.Sequential([
        vectorize_layer,
        tf.keras.models.load_model('rnn_model/my_model')
    ])

    export_model.compile(loss=losses.CategoricalCrossentropy(from_logits=False,
                                                             label_smoothing=0,
                                                             reduction="auto",
                                                             name="categorical_crossentropy"),
                         optimizer='adam',
                         metrics=['categorical_accuracy'])
    return export_model