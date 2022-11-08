import sys
import pandas as pd
import json
# import seaborn as sns 
# import matplotlib.pyplot as plt
# import os


filename = sys.argv[1]

path = f"C:/Users/micha/Development/Javascript/React/viz-gen Back End/storage/{filename}"



df = pd.read_csv(path)

cols = df.columns

num_data = [cname for cname in cols if df[cname].dtypes == 'object']
cat_data = [cname for cname in cols if df[cname].dtypes in ['int64', 'float64']]

# this is right so far 
data_types = {
  'nums': num_data,
  'cat': cat_data
}

json_data = json.dumps(data_types)

print(json_data)
sys.stdout.flush()




# sns.pairplot(df, hue="species"); 

# plt.show()