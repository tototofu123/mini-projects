import boto3
from botocore.exceptions import ClientError

def set_glacier_transition_rule(bucket_name: str, prefix: str = "") -> None:
    """
    Set an object-level lifecycle rule to transition objects to Glacier
    after 30 days.

    Args:
        bucket_name: The S3 bucket name.
        prefix: Optional object key prefix to apply the rule to.
    """
    s3 = boto3.client("s3")

    # Build the lifecycle configuration
    transition = {
        "Transition": {
            "Days": 30,
            "StorageClass": "GLACIER",
        }
    }

    rule = {
        "Filter": {
            "Prefix": prefix,
        },
        "Status": "Enabled",
        "Transitions": [transition],
    }

    lifecycle_configuration = {
        "Rules": [rule],
    }

    try:
        s3.put_bucket_lifecycle_configuration(
            Bucket=bucket_name,
            LifecycleConfiguration=lifecycle_configuration,
        )
        print(f"Successfully set lifecycle rule on bucket '{bucket_name}'.")
        print(f"Objects under prefix '{prefix}' will transition to Glacier after 30 days.")
    except ClientError as e:
        error_code = e.response["Error"]["Code"]
        print(f"Error setting lifecycle rule: {error_code} - {e.response['Error']['Message']}")
        raise