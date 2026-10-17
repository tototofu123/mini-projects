import boto3
from botocore.exceptions import ClientError

def add_glacier_transition_rule(bucket_name):
    s3 = boto3.client('s3')
    try:
        s3.create_lifecycle_configuration(
            Bucket=bucket_name,
            LifecycleConfiguration={
                'Rules': [
                    {
                        'ID': 'MoveToGlacierAfter30Days',
                        'Status': 'Enabled',
                        'Transitions': [{
                            'StorageClass': 'GLACIER',
                            '1': 30,
                        }]
                    }
                ]
            }
        )
        return f'Lifecycle rule created for {bucket_name}'
    except ClientError as e:
        if 'InvalidLifecycleConfiguration' in str(e):
            return f'Bucket {bucket_name} already has a lifecycle config; use get_bucket_lifecycle_configuration to modify.'
        raise e