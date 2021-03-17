import matplotlib.pyplot as plt
import pickle
import matplotlib
# Load figure from disk and display
matplotlib.use('TkAgg')
with open('image.pickle', 'rb') as f:
    fig_handle = pickle.load(f)
    fig_handle.show()