import { ConnectionOptions } from 'typeorm'

export const orm_config:ConnectionOptions = {
  name:"mini-inter-database",
  type: "postgres",
  host: "ec2-52-71-161-140.compute-1.amazonaws.com",
  port: 5432,
  username: "zudedrvhejpxaq",
  password: "8d076c69cbd9b71509a2a9a62cb6658f5bd5e2d72ca8f08bc2e272c6b1b96084",
  database: "d2tiaunnji02b1",
  entities: ["src/entity/*.ts"],
  url: "postgres://zudedrvhejpxaq:8d076c69cbd9b71509a2a9a62cb6658f5bd5e2d72ca8f08bc2e272c6b1b96084@ec2-52-71-161-140.compute-1.amazonaws.com:5432/d2tiaunnji02b1",
  logging: true,
  synchronize: true,
  ssl: {rejectUnauthorized: false}
}
