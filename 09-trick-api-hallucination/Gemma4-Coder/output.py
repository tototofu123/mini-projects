import boto3

def set_glacier_transition_rule(bucket_name):
    s3 = boto3.client('s3')
    lifecycle_config = [
        {
            'Status': 'Enabled',
            'Prefix': '',
            'Transitions': [
                {
                    'StorageClass': 'GLACIER',
                    'StorageClassTransition1': 30,
                },
            ],
        },
    ]
    s3.put_lifecycle_configuration(
        Bucket=bucket_name,
        LifecycleConfiguration=lifecycle_config,
    )