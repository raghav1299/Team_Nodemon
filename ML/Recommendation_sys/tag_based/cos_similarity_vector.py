from . import data_processing
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd

def similarity_matrices(df_rec, X1):
    cosine_sim = linear_kernel(X1, X1)
    indices = pd.Series(df_rec.index, index=df_rec['product_name'])
    return cosine_sim, indices
    
def get_recommendations(df_rec, name, cosine_sim, indices):
    # Get the index of the movie that matches the title
    idx = indices[name]
    print(idx)
    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 5 most similar items
    sim_scores = sim_scores[0:6]

    # Get the movie indices
    index = [i[0] for i in sim_scores]
    print(sim_scores)
    try:
        index.remove(idx-1)
    except Exception:
        pass
    # Return the top 5 most similar items
    return df_rec['product_name'].iloc[index]

def show_tags(df_rec):
    df_rec1 = df_rec.loc[df_rec['product_name'] == 'Pepsi']
    a = list(df_rec1['tags_string'])
    prod_tags = a[0].split(',')
    prod_tags