import { Stack, StackProps, ResourceEnvironment, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as rds from 'aws-cdk-lib/aws-rds'

export class DevelopmentDatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
        
    const vpc = ec2.Vpc.fromLookup(this, "ImportVPC", {isDefault: false, vpcName: "DevelopmentVpcStack/Vpc"});
    const cluster = new rds.ServerlessCluster(this, 'Database', {
        engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
        vpcSubnets: {
            subnetGroupName: "DB",
        },
        vpc,
        defaultDatabaseName: "DevelopmentDatabase",
        clusterIdentifier: "development-database",
        credentials: {
            username: "allmoxyuser",
            //password: SecretValue.secretsManager("development-database-password"),
        },
    });
  }
}
