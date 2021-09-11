import json
import os

with open('package.json', 'r+') as json_file:
  data = json.load(json_file)
  rawVersion = data['version']
  tag = os.getenv('npmPublishTag')
  buildNumber = os.getenv('buildNumber')
  if tag == 'latest':
    version = rawVersion
  elif tag == 'beta':
    version = f'{rawVersion}-beta.{buildNumber}'
  else:
    version = f'{rawVersion}-dev.{buildNumber}'
  print(f'version {version}')
  data['version'] = version
  json_file.seek(0)
  json.dump(data, json_file, indent='\t')
  json_file.truncate()
